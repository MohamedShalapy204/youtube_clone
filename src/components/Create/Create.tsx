
const Create = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center p-6">
            <div className="text-6xl mb-4">➕</div>
            <h1 className="text-3xl font-bold mb-2">Create Content</h1>
            <p className="text-base-content/60 max-w-md">
                Upload a video, start a live stream, or create a short.
            </p>
            <button className="btn btn-primary mt-6">Upload Video</button>
        </div>
    );
};

export default Create;
