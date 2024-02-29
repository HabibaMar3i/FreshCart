function BrandModal({ brands }) {
    return <>
        <div className="card">
            <img src={brands.image} className="card-img-top" style={{ height: '200px' }} alt={brands.name} data-bs-toggle="modal" data-bs-target="#exampleModal"/>
            <div className="">
                <p className="text-center fw-bold mt-3 text-main">{brands.name}</p>
            </div>
        </div>
        <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                    <p className="text-center fw-bold mt-3 text-main">{brands.name}</p>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                    <img src={brands.image} className="card-img-top" style={{ height: '250px' }} alt={brands.name} />
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    </>;
}

export default BrandModal;


