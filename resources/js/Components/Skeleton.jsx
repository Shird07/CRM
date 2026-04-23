export default function Skeleton() {
    return (
        <div className="space-y-4">

            {[1,2,3].map(i => (
                <div
                    key={i}
                    className="h-4 rounded bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 bg-[length:200%_100%] animate-shimmer"
                />
            ))}

        </div>
    );
}