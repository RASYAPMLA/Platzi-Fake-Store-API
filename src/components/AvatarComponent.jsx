export default function Avatar({ src }) {
    return (
        <div className="flex justify-center -mt-20">
            <img
                src={src}
                alt="avatar"
                className="w-40 h-40 rounded-full object-cover border-4 border-white shadow-lg bg-white"
            />
        </div>
    );
}
