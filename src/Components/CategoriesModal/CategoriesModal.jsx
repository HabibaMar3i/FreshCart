function CategoriesModal({ category }) {
    return (
        <div className="card">
            <img src={category.image} className="card-img-top" style={{ height: '400px' }} alt={category.name} />
            <div className="">
                <p className="text-center fw-bold mt-3 text-main">{category.name}</p>
            </div>
        </div>
    );
}

export default CategoriesModal;
