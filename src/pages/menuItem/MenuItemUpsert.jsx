import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import inputHelper from '../../helper/inputHelper';
import toastNotify from '../../helper/toastNotify';

const menuItemData = {
  name: '',
  description: '',
  specialTag: '',
  category: '',
  price: '',
};

const MenuItemUpsert = () => {
  const [menuItemInputs, setMenuItemInputs] = useState(menuItemData);
  const [imageToBeStore, setImageToBeStore] = useState('');
  const [imageToBeDisplay, setImageToBeDisplay] = useState(menuItemData);
  const { id } = useParams();

  const handleMenuItemInput = (e) => {
    const tempData = inputHelper(e, menuItemData);
    setMenuItemInputs(tempData);
  };

  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const imgType = file.type.split('/')[1];
      const validImgTypes = ['jpeg', 'jpg', 'png'];

      const isImageTypeValid = validImgTypes.filter((e) => {
        return e === imgType;
      });

      if (file.size > 1000 * 1024) {
        setImageToBeStore('');
        toastNotify('File must be less than 1MB', 'error');
        return;
      } else if (isImageTypeValid.length === 0) {
        setImageToBeStore('');
        toastNotify('File must be in jpeg, jpg, or png', 'error');
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(file);
      setImageToBeStore(file);
      reader.onload = (e) => {
        //console.log(e);
        const imgUrl = String(e.target?.result);
        setImageToBeDisplay(imgUrl);
      };
    }
  };

  return (
    <div className="container border mt-5 p-5">
      <h3 className="offset-2 px-2 text-success">
        {id ? 'Update Product' : 'Add Product'}
      </h3>
      <form method="post" encType="multipart/form-data">
        <div className="row mt-3">
          <div className="col-md-5 offset-2">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Name"
              required
              name="name"
              value={menuItemInputs.name}
              onChange={handleMenuItemInput}
            />
            <textarea
              className="form-control mt-3"
              placeholder="Enter Description"
              row={40}
              name="description"
              value={menuItemInputs.description}
              onChange={handleMenuItemInput}
            ></textarea>
            <input
              type="text"
              className="form-control mt-3"
              placeholder="Enter Special Tag"
              name="specialTag"
              value={menuItemInputs.specialTag}
              onChange={handleMenuItemInput}
            />
            <input
              type="text"
              className="form-control mt-3"
              placeholder="Enter Category"
              name="category"
              value={menuItemInputs.category}
              onChange={handleMenuItemInput}
            />
            <input
              type="number"
              className="form-control mt-3"
              required
              placeholder="Enter Price"
              name="price"
              value={menuItemInputs.price}
              onChange={handleMenuItemInput}
            />
            <input
              type="file"
              onChange={handleFileChange}
              className="form-control mt-3"
            />
            <div className="text-center">
              <button
                type="submit"
                style={{ width: '50%' }}
                className="btn btn-success mt-5"
              >
                Submit
              </button>
            </div>
          </div>
          <div className="col-md-5 text-center">
            <img
              src={imageToBeDisplay}
              style={{ width: '100%', borderRadius: '30px' }}
              alt=""
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default MenuItemUpsert;
