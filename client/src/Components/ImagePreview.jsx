export const ImagePreview = ({ image, name }) => {
    return (
        <div className="w-40 mt-2 h-40 p-2 bg-main border border-border rounded">
            <img
                src={image ? image : "https://res.cloudinary.com/dwfmpiozq/image/upload/v1730567122/Logo_m2ooop.png"}
                alt={name}
                className="w-full h-full object-cover rounded"
            />
        </div>
    );
};
