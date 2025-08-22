import { Button } from '@/components/ui/button';
import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet';
import { useState } from 'react';

const navLinks = [
	{ name: 'Home', href: '/' },
	{ name: 'Dashboard', href: '/dashboard' },
	{ name: 'Pricing', href: '/pricing' },
];

const Navbar = () => {
	const [open, setOpen] = useState(false);

	return (
		<nav
			className='fixed top-0 left-0 w-full bg-black shadow z-50 animate-navbar-float'
		>
			<div className='max-w-7xl mx-auto flex items-center justify-between px-6 py-4'>
				<span className='text-3xl font-extrabold text-white tracking-tight animate-slide-down'>
					TrueWord
				</span>
				<div className='hidden md:flex gap-8 items-center'>
					{navLinks.map(link => (
						<a
							key={link.name}
							href={link.href}
							className='text-white hover:text-gray-300 font-medium transition-colors duration-200'
						>
							{link.name}
						</a>
					))}
					<a href='/login'>
						<Button variant='outline' className='!bg-transparent !border !border-white !text-white hover:!bg-white hover:!text-black transition'>
							Login
						</Button>
					</a>
					<a href='/signup'>
						<Button className='!bg-transparent !border !border-white !text-white hover:!bg-white hover:!text-black transition'>
							Sign Up
						</Button>
					</a>
				</div>
				<div className='md:hidden'>
					<Sheet open={open} onOpenChange={setOpen}>
						<SheetTrigger asChild>
							<Button variant='ghost' size='icon' aria-label='Open menu' className='text-white'>
								<span className='material-icons text-3xl'>menu</span>
							</Button>
						</SheetTrigger>
						<SheetContent side='right' className='bg-black pt-12'>
							<div className='flex flex-col gap-6'>
								{navLinks.map(link => (
									<a
										key={link.name}
										href={link.href}
										className='text-white hover:text-gray-300 font-medium text-lg'
										onClick={() => setOpen(false)}
									>
										{link.name}
									</a>
								))}
								<a href='/login'>
									<Button variant='ghost' className='bg-transparent border border-white text-white hover:bg-white hover:text-black transition '>
										Login
									</Button>
								</a>
								<a href='/signup'>
									<Button className='w-full bg-white text-black hover:bg-gray-200 transition'>
										Sign Up
									</Button>
								</a>
							</div>
						</SheetContent>
					</Sheet>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;