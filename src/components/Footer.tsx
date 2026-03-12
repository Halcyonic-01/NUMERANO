import { Linkedin, Instagram, Link as LinkIcon } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Footer() {
    return (
        <motion.footer
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="relative z-10 text-gray-400 py-12 text-sm"
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-12">
                    {/* Quick Links */}
                    <div>
                        <h3 className="text-[#00e5ff] font-semibold text-lg mb-6">Quick Links</h3>
                        <ul className="space-y-4">
                            <li><a href="/#home" className="hover:text-white transition-colors">Home</a></li>
                            <li><a href="/#teams" className="hover:text-white transition-colors">Teams</a></li>
                            <li><a href="/#activities" className="hover:text-white transition-colors">Activities</a></li>
                            <li><a href="/#feedback" className="hover:text-white transition-colors">Feedback</a></li>
                            <li><a href="/brainbuff" className="hover:text-white transition-colors">BrainBuff</a></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-[#00e5ff] font-semibold text-lg mb-6">Contact</h3>
                        <ul className="space-y-4">
                            <li><a href="mailto:numeranoclubdsce@gmail.com" className="hover:text-white transition-colors">numeranoclubdsce@gmail.com</a></li>
                            <li>Dayananda Sagar College of Engineering</li>
                            <li>Shavige Malleshwara Hills, 91st Main Rd,</li>
                            <li>1st Stage, Kumaraswamy Layout,</li>
                            <li>Bengaluru, Karnataka 560111</li>
                        </ul>
                    </div>

                    {/* Connect */}
                    <div>
                        <h3 className="text-[#00e5ff] font-semibold text-lg mb-6">Connect</h3>
                        <div className="flex space-x-4">
                            <a href="https://chat.whatsapp.com/IqLT79KjGEL6kPMkdKWKGI" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#00e5ff] transition-colors" title="Join Our WhatsApp Community">
                                <LinkIcon size={20} />
                            </a>
                            <a href="https://www.linkedin.com/company/numerano" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#00e5ff] transition-colors" title="LinkedIn">
                                <Linkedin size={20} />
                            </a>
                            <a href="https://www.instagram.com/numeranoclub_dsce/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#00e5ff] transition-colors" title="Instagram">
                                <Instagram size={20} />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-gray-800 text-center">
                    <p>&copy; {new Date().getFullYear()} Numerano. All rights reserved.</p>
                </div>
            </div>
        </motion.footer>
    );
}
