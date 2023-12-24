import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MinLoader, MainLoader } from '../components/page/common';
import { useGetMenuItemByIdQuery } from '../apis/menuItemApi';
import { useUpdateShoppingCartMutation } from '../apis/shoppingCartApi';

const MenuItemDetails = () => {
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const { menuItemId } = useParams();
  const { data, isLoading } = useGetMenuItemByIdQuery(menuItemId);
  const navigate = useNavigate();
  const [updateShoppingCart] = useUpdateShoppingCartMutation();

  //const userId = 1e04f782-5283-4020-a71f-da8da39ae415

  const handleQuantity = (counter) => {
    let newQuantity = quantity + counter;
    if (newQuantity === 0) {
      newQuantity = 1;
    }
    setQuantity(newQuantity);
  };

  const handleAddToCart = async (menuItemId) => {
    setIsAddingToCart(true);
    const res = await updateShoppingCart({
      menuItemId: menuItemId,
      updateQuantityBy: quantity,
      userId: '1e04f782-5283-4020-a71f-da8da39ae415',
    });
    console.log(res);
    setIsAddingToCart(false);
  };

  return (
    <div className="container pt-4 pt-md-5">
      {!isLoading ? (
        <div className="row">
          <div className="col-7">
            <h2 className="text-success">{data.result.name}</h2>
            <span>
              <span
                className="badge text-bg-dark pt-2"
                style={{ height: '40px', fontSize: '20px' }}
              >
                {data.result.category}
              </span>
            </span>
            <span>
              <span
                className="badge text-bg-light pt-2"
                style={{ height: '40px', fontSize: '20px' }}
              >
                {data.result.specialTag && data.result.specialTag}
              </span>
            </span>
            <p style={{ fontSize: '20px' }} className="pt-2">
              {data.result.description}
            </p>
            <span className="h3">${data.result.price}</span> &nbsp;&nbsp;&nbsp;
            <span
              className="pb-2  p-3"
              style={{ border: '1px solid #333', borderRadius: '30px' }}
            >
              <i
                className="bi bi-dash p-1"
                style={{ fontSize: '25px', cursor: 'pointer' }}
                onClick={() => handleQuantity(-1)}
              ></i>
              <span className="h3 mt-3 px-3">{quantity}</span>
              <i
                className="bi bi-plus p-1"
                style={{ fontSize: '25px', cursor: 'pointer' }}
                onClick={() => handleQuantity(+1)}
              ></i>
            </span>
            <div className="row pt-4">
              <div className="col-5">
                {isAddingToCart ? (
                  <button disabled className="btn btn-success form-control">
                    <MinLoader />
                  </button>
                ) : (
                  <button
                    className="btn btn-success form-control"
                    onClick={() => handleAddToCart(data.result.id)}
                  >
                    Add to Cart
                  </button>
                )}
              </div>

              <div className="col-5 ">
                <button
                  className="btn btn-secondary form-control"
                  onClick={() => navigate(-1)}
                >
                  Back to Home
                </button>
              </div>
            </div>
          </div>
          <div className="col-5">
            <img
              src={data.result.image}
              width="100%"
              style={{ borderRadius: '50%' }}
              alt="No content"
            ></img>
          </div>
        </div>
      ) : (
        <div
          className="d-flex justify-content-center"
          style={{ width: '100%' }}
        >
          <MainLoader />
        </div>
      )}
    </div>
  );
};

export default MenuItemDetails;
