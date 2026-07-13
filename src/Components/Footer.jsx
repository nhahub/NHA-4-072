import logo from '../assets/G.svg'
import { Link } from 'react-router-dom'
import { FaFacebookF, FaTwitter, FaInstagram, FaGithub } from 'react-icons/fa'

export default function Footer() {
	return (
		<footer className="w-full bg-gradient-to-t from-[#070F2B] to-[#070F2B]/10 text-gray-300 mt-12">
			<div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
				<div className="flex flex-col gap-4">
					<Link to="/" className="flex items-center gap-3">
						<img src={logo} alt="GameHub" className="h-10 w-auto" />
						<span className="text-white font-semibold text-lg">GameHub</span>
					</Link>
					<p className="text-sm text-gray-400 max-w-xs">A neat place to discover and track your favourite games. Curated lists, reviews and more.</p>
				</div>

				<div>
					<h4 className="text-white font-semibold mb-3">Browse</h4>
					<ul className="flex flex-col gap-2 text-gray-400 text-sm">
						<li><Link to="/browse" className="hover:text-white transition-colors">All Games</Link></li>
						<li><Link to="/categories" className="hover:text-white transition-colors">Categories</Link></li>
						<li><Link to="/wishlist" className="hover:text-white transition-colors">Wishlist</Link></li>
					</ul>
				</div>

				<div>
					<h4 className="text-white font-semibold mb-3">Support</h4>
					<ul className="flex flex-col gap-2 text-gray-400 text-sm">
						<li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
						<li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
						<li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
					</ul>
				</div>

				<div>
					<h4 className="text-white font-semibold mb-3">Follow us</h4>
					<div className="flex items-center gap-3 mb-4">
						<a href="#" className="p-2 rounded-full bg-[#1c1853]/70 hover:bg-[#2e2685] transition-colors"><FaFacebookF /></a>
						<a href="#" className="p-2 rounded-full bg-[#1c1853]/70 hover:bg-[#2e2685] transition-colors"><FaTwitter /></a>
						<a href="#" className="p-2 rounded-full bg-[#1c1853]/70 hover:bg-[#2e2685] transition-colors"><FaInstagram /></a>
						<a href="#" className="p-2 rounded-full bg-[#1c1853]/70 hover:bg-[#2e2685] transition-colors"><FaGithub /></a>
					</div>
					<p className="text-sm text-gray-400">Join our newsletter for updates and exclusive content.</p>
				</div>
			</div>

			<div className="border-t border-white/5">
				<div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500">
					<span>© {new Date().getFullYear()} GameHub. All rights reserved.</span>
					<div className="mt-2 sm:mt-0">Made with ♥ for gamers</div>
				</div>
			</div>
		</footer>
	)
}

