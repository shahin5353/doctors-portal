import React from 'react';
import { Link } from 'react-router-dom';
import mask from '../../images/Mask_Group_1.png'


const AppBody = () => {
    return (
        <div className="row my-5">
           <div className="col-md-6">
               <h1 className="display-3 font-weight-bold">Your New Smile
Starts Here</h1>
<p className="text-muted mt-4 mb-5" style={{fontSize:'20px'}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the</p>
<Link to="/appointment">
<button className="btn primary-btn text-uppercase p-3 text-light" style={{fontSize:"22px",fontWeight:'800'}}>get appointment</button>
</Link>
           </div>
           <div className="col-md-6 mt-2 d-md-block d-sm-none">
                   <img className="img-fluid" src={mask} alt=""/>
                </div>
        </div>
    );
};

export default AppBody;