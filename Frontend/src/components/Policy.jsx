import React from 'react';

const policies = [
  {
    title: "Free Shipping",
    text: "Free shipping on all orders over $50. Fast delivery to your doorstep.",
    image: "https://imgs.search.brave.com/8vFOm4dUADVb-OO8qBggp_5YGyHT9oLr2Noyzq3TXNc/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAzLzcyLzU3LzU5/LzM2MF9GXzM3MjU3/NTkxMF9wV29HMzFI/RjB4MW0yRVp2bTU0/SU5KMEprQTR3WlVV/RS5qcGc"// Replace with real image URL
  },
  {
    title: "Easy Returns",
    text: "30-day return policy. No questions asked, hassle-free returns.",
    image: "https://imgs.search.brave.com/-UaPR6GHeX_DQHa82oJL7voYuzGtQUj2P-HqRo-mmag/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzY4L2Rj/LzEyLzY4ZGMxMmU3/ZGEyZDQ5OWM2ZjEx/ZDcwZWEyZTk2NDk5/LmpwZw"
  },
  {
    title: "Secure Payment",
    text: "Your payment information is always secure with encrypted transactions.",
    image: "https://imgs.search.brave.com/NSdZ3APHQ0H0ZfRASrdmu1ieb_IkMxnYotZNnFGd_tw/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9mcmVl/ZGVzaWduZmlsZS5j/b20vdXBsb2FkLzIw/MTgvMDEvU2VjdXJl/LVBheW1lbnQtSWNv/bi5qcGc"
  },
  {
    title: "Special Discounts",
    text: "Regular promotions and special discounts for loyal customers.",
    image: "https://imgs.search.brave.com/8HY3hxxoPEvyToa89zpbBVgzPCona1JC2_i5GNiZ69A/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzEyLzU5Lzg3LzU3/LzM2MF9GXzEyNTk4/NzU3MjdfZ0RBMTI0/ZmRhWjUyanp3eW1S/Vm1RZkNZaXJDT3dM/SFYuanBn"
  }
];

const Policy = () => {
  return (
    <div className="container my-5">
      <div className="row justify-content-center text-center g-4">
      <h2>Policy</h2>
        {policies.map((policy, index) => (
          <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={index}>
            <div className="card h-100 text-center">
              <img src={policy.image} className="card-img-top" alt={policy.title} />
              <div className="card-body">
                <h5 className="card-title">{policy.title}</h5>
                <p className="card-text">{policy.text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Policy;
