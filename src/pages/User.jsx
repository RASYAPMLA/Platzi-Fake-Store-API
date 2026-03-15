import { useEffect, useState } from "react";
import { Spinner } from "flowbite-react";

export default function User() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await fetch("https://api.escuelajs.co/api/v1/users/3");
                const data = await res.json();

                setUser({
                    name: data.name,
                    email: data.email,
                    role: data.role,
                    avatar: data.avatar,
                });
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        getUser();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-white">
                <Spinner size="xl" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-6">
            <div className="w-full max-w-3xl bg-white/100 backdrop-blur-xl 
                border border-white/20 rounded-3xl shadow-2xl p-8">
                <div className="flex flex-col md:flex-row items-center md:items-center gap-8">
                    <div className="flex-shrink-0">
                        <img
                            src={user.avatar}
                            alt={user.name}
                            className="w-40 h-40 rounded-2xl object-cover 
                            shadow-xl border-4 border-white/20"
                        />
                    </div>
                    <div className="flex-1 text-center md:text-left">
                        <h1 className="text-3xl font-bold text-white">
                            {user.name}
                        </h1>
                        <p className="text-slate-300 mt-2 text-lg">
                            {user.email}
                        </p>
                        <div className="mt-5">
                            <span className="px-5 py-2 text-sm font-semibold uppercase tracking-wider
                                rounded-full bg-gradient-to-r 
                                from-blue-500 to-indigo-600 text-white shadow-lg">
                                {user.role}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}