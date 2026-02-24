import { useEffect, useState } from "react";
import { Spinner } from "flowbite-react";
import Avatar from "../components/AvatarComponent";

export default function User() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await fetch("https://api.escuelajs.co/api/v1/users/1");
                const data = await res.json();

                setUser({
                    name: data.name,
                    email: data.email,
                    role: data.role,
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

            <div className="w-full max-w-3xl bg-white/10 backdrop-blur-xl 
                    border border-white/20 rounded-3xl shadow-2xl p-8">

                <div className="flex flex-col md:flex-row items-center md:items-start gap-8">

                    {/* LEFT SIDE - AVATAR */}
                    <div className="flex-shrink-0">
                        <img
                            src="https://i.imgur.com/LDOO4Qs.jpg"
                            alt="avatar"
                            className="w-40 h-40 rounded-2xl object-cover 
                        shadow-xl border-4 border-white/20"
                        />
                    </div>

                    {/* RIGHT SIDE - INFO */}
                    <div className="flex-1 text-center md:text-left">

                        <h1 className="text-3xl font-semibold tracking-tight text-white">
                            {user.name}
                        </h1>

                        <p className="text-slate-300 mt-2">
                            {user.email}
                        </p>

                        <div className="mt-4">
                            <span className="px-4 py-1 text-xs font-medium uppercase tracking-wider
                             rounded-full bg-gradient-to-r 
                             from-blue-500 to-indigo-500 text-white">
                                {user.role}
                            </span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
