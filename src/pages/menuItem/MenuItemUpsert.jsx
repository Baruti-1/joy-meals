import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import inputHelper from '../../helper/inputHelper';
import toastNotify from '../../helper/toastNotify';
import {
  useCreateMenuItemMutation,
  useGetMenuItemByIdQuery,
  useUpdateMenuItemMutation,
} from '../../apis/menuItemApi';
import { MainLoader } from '../../components/page/common';

const menuItemData = {
  name: '',
  description: '',
  specialTag: '',
  category: '',
  price: '',
};

const MenuItemUpsert = () => {
  const [loading, setLoading] = useState(false);
  const [menuItemInputs, setMenuItemInputs] = useState(menuItemData);
  const [imageToStore, setImageToStore] = useState('');
  const [imageToDisplay, setImageToDisplay] = useState(menuItemData);
  const navigate = useNavigate();
  const { id } = useParams();
  const [createMenuItem] = useCreateMenuItemMutation();
  const [updateMenuItem] = useUpdateMenuItemMutation();
  const { data } = useGetMenuItemByIdQuery(id);

  console.log(data);

  useEffect(() => {
    if (data && data.result) {
      const tempData = {
        name: data.result.name,
        description: data.result.description,
        specialTag: data.result.specialTag,
        category: data.result.category,
        price: data.result.price,
      };
      setMenuItemInputs(tempData);
      setImageToDisplay(data.result.image);
    }
  }, [data]);

  const handleMenuItemInput = (e) => {
    const tempData = inputHelper(e, menuItemInputs);
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
        setImageToStore('');
        toastNotify('File must  less than 1MB', 'error');
        return;
      } else if (isImageTypeValid.length === 0) {
        setImageToStore('');
        toastNotify('File must  in jpeg, jpg, or png', 'error');
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(file);
      setImageToStore(file);
      reader.onload = (e) => {
        //console.log(e);
        const imgUrl = String(e.target?.result);
        setImageToDisplay(imgUrl);
      };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!imageToStore && !id) {
      toastNotify('Please upload an image', 'error');
      setLoading(false);
      return;
    }

    const formData = new FormData();

    formData.append('Name', menuItemInputs.name);
    formData.append('Description', menuItemInputs.escription);
    formData.append('SpecialTag', menuItemInputs.specialTag);
    formData.append('Category', menuItemInputs.category);
    formData.append('Price', menuItemInputs.price);
    if (imageToDisplay) formData.append('File', imageToStore);

    let response;

    if (id) {
      // update
      formData.append('Id', id);
      response = updateMenuItem({
        data: formData,
        id,
      });
      toastNotify('Menu Item updated', 'success');
    } else {
      // create
      response = await createMenuItem(formData);
      toastNotify('Menu Item created', 'success');
    }

    if (response) {
      console.log(response);
      setLoading(false);
      navigate('/menuitem/menuitemlist');
    }
    setLoading(false);
  };

  return (
    <div className="container border mt-5 p-5 bg-light">
      {loading && <MainLoader />}
      <h3 className="offset-2 px-2 text-success">
        {id ? 'Update Menu Item' : 'Add Menu Item'}
      </h3>
      <form method="post" encType="multipart/form-data" onSubmit={handleSubmit}>
        <div className="row mt-3">
          <div className="col-md-7">
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
              row={25}
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
                {id ? 'Update' : 'Create'}
              </button>
            </div>
          </div>
          <div className="col-md-5 text-center">
            <img
              src={imageToDisplay}
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
