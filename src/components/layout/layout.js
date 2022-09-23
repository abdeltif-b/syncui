import React, { useRef, useState } from 'react';
import { Menubar } from 'primereact/menubar';
import Router, { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBarsProgress, faCubes, faFileImport, faGears, faHome, faUser, faRightFromBracket, faShip, faTrackArrowRight, faTruckArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useAuthSession, useLogout } from '../../hooks/services';
import { Menu } from 'primereact/menu';
import { Button } from 'primereact/button';


export function RootLayout({ children }) {
	// const user = useAuthSession();
	const [user, setUser] = useState({
		name: 'ahmed',
		username: 'user'
	})
	const menu = useRef(null);

	const router = useRouter()

	const items = [
		{
			label: 'Accueil',
			icon: <FontAwesomeIcon icon={faHome} className="mr-2" />,
			className: router.route === '/' ? 'p-menuitem-active' : '',
			command: (event) => router.push('/')
		},
		{
			label: 'Plans de déchargement',
			icon: <FontAwesomeIcon icon={faTruckArrowRight} className="mr-2" />,
			className: router.route.startsWith('/deployment') ? 'p-menuitem-active' : '',
			command: (event) => router.push('/deployment')
		},
		{
			label: 'Plan des navires',
			icon: <FontAwesomeIcon icon={faShip} className="mr-2" />,
			className: router.route.startsWith('/vessel') ? 'p-menuitem-active' : '',
			command: (event) => router.push('/vessel')
		},
		{
			label: 'Suivi de réalisation',
			icon: <FontAwesomeIcon icon={faBarsProgress} className="mr-2" />,
			items: [
				{ label: 'Taux de réalisation', icon: 'pi pi-fw pi-home', to: '/stock' },
				{ label: 'Déploiement hors plan', icon: 'pi pi-fw pi-home', to: '/stock' },
			]
		},
		{
			label: 'Paramétrage',
			icon: <FontAwesomeIcon icon={faGears} className="mr-2" />,
			className: router.route.startsWith('/setting') ? 'p-menuitem-active' : '',
			command: (event) => router.push('/setting')
		},
	];

	const userItems = [
		{
			label: <>
				<span className='font-bold'>{user?.name}</span>
				<span className='text-xs'> ({user?.username})</span>
			</>,
			className: 'justify-content-between'
		},
		{
			label: <span className='text-red-700'>Déconnexion</span>,
			icon: <FontAwesomeIcon icon={faRightFromBracket} className="text-red-700 mr-2" />,
			className: 'bg-red-50',
			command: (event) => Router.push('/auth/login')

		},

	]

	const start = <img alt="logo" src="/assets/img/logo_dark.png" onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} height="28" className="ml-3 mr-6"></img>;
	// const end = <InputText placeholder="Search" type="text" />;
	const end = (
		<>
			<Menu model={userItems} popup ref={menu} id="user_menu" />
			<Button icon={<FontAwesomeIcon icon={faUser} />} onClick={(event) => menu.current.toggle(event)} aria-controls="user_menu" aria-haspopup className='p-button-sm p-button-outlined p-button-primary' />
		</>
	);

	// default font size
	// const scale = 12
	// useEffect(() => {
	// 	document.documentElement.style.fontSize = scale + 'px';
	// }, [scale])

	// if (!user) return 'Chargement de la session...';

	return (
		<div>
			<Menubar model={items} start={start} end={end} className='surface-0' />
			{children}
		</div>
	);
}

