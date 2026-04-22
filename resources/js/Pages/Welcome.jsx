import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';

export default function Welcome() {
    return (
        <>
            <Head title="Landing" />

            <div className="min-h-screen bg-gradient-to-br from-[#2c1a4d] to-[#8e44ad] text-white relative overflow-hidden">

                {/* NAVBAR */}
                <motion.div 
                    initial={{ y: -80, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    className="fixed top-0 w-full flex justify-between items-center px-10 py-4 bg-white/90 text-black z-50"
                >
                    <h1 className="font-bold">Prototype</h1>
                    <div className="flex gap-6">
                        <Link href="/login">Sign in</Link>
                        <Link href="/register" className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-1 rounded-md">
                            Sign up free
                        </Link>
                    </div>
                </motion.div>

                {/* HERO */}
                <div className="h-screen flex items-center justify-center relative">

                {/* CIRCLE BLOOM (MEKAR) */}

                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-br from-pink-500 to-purple-700"
                />

                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="absolute w-[450px] h-[450px] rounded-full bg-gradient-to-br from-purple-500 to-indigo-700"
                />

                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="absolute w-[300px] h-[300px] rounded-full bg-gradient-to-br from-pink-400 to-purple-600"
                />

                    {/* LEFT TEXT */}
                    <motion.div
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        className="absolute left-10 top-1/2 -translate-y-1/2"
                    >
                        <h1 className="text-4xl font-bold">500+</h1>
                        <p>Brands</p>
                    </motion.div>

                    {/* RIGHT TEXT */}
                    <motion.div
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        className="absolute right-10 top-1/2 -translate-y-1/2 text-right"
                    >
                        <h1 className="text-4xl font-bold">1000+</h1>
                        <p>Buyers</p>
                        <span className="text-sm">Affordable prices</span>
                    </motion.div>

                    {/* PHONE FLOATING */}
                    <motion.img
                        src="/img/tanganHP.png"
                        className="h-[450px] rotate-[-15deg] relative z-10"
                        animate={{ y: [0, -20, 0] }}
                        transition={{ repeat: Infinity, duration: 3 }}
                    />

                </div>

                {/* FEATURES */}
                <div className="flex justify-center gap-6 py-16 flex-wrap">

                    {[ "Performa tinggi", "Gaya modern", "Kualitas terbaik" ].map((text, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.2 }}
                            className="bg-white/10 p-6 rounded-xl w-52 text-center backdrop-blur-md"
                        >
                            <p>{text}</p>
                        </motion.div>
                    ))}

                </div>

                {/* CTA */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="text-center py-20"
                >
                    <h2 className="text-xl font-semibold">Jangan Tunggu!</h2>

                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="mt-4 bg-orange-500 px-6 py-2 rounded-lg"
                    >
                        Order Now
                    </motion.button>
                </motion.div>

                {/* FOOTER */}
                <div className="bg-black text-center py-10">
                    <p>© CRM Gadget</p>
                </div>

            </div>
        </>
    );
}