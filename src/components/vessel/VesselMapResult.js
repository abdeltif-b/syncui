import React from 'react'
import { MapsComponent, Inject, LayersDirective, LayerDirective, Marker, MapsTooltip, MarkersDirective, MarkerDirective, NavigationLine, Zoom } from '@syncfusion/ej2-react-maps';

export const data1 = [
	{
		name: 'ALLEGRI',
		latitude: 33.769159,
		longitude: -8.619032,
		destination: 'Casablanca, Morocco',
		source: 'Rouen, France',
		vitesse: '11.2kn',
		arrival_date: '2022-09-23 10:35',
		proposed_speed: '9kn',
		expected_date: '2022-09-23 11:34',
		image: 'https://static.vesselfinder.net/ship-photo/9045651-271000615-134c3b209face4dc39e9a36f97ee25d9/0',
	},
	{
		name: 'MICHEL A',
		latitude: 33.405960,
		longitude: -10.101407,
		destination: 'Casablanca, Morocco',
		source: 'Gibraltar, Gibraltar',
		vitesse: '10.3kn',
		arrival_date: '2022-09-23 19:07',
		proposed_speed: '8kn',
		expected_date: '2022-09-23 20:41',
		image: 'https://static.vesselfinder.net/ship-photo/9083043-211217360-b6d7d623558eb321a759341edaef8349/0',
	},
	{
		name: 'VENEZIA D',
		latitude: 33.347707,
		longitude: -8.758550,
		destination: 'Casablanca, Morocco',
		source: 'Newport News, United States (USA)',
		vitesse: '12.4kn',
		arrival_date: '2022-09-23 10:35',
		proposed_speed: '14kn',
		expected_date: '2022-09-23 9:44',
		image: 'https://static.vesselfinder.net/ship-photo/9301835-477581400-7b3d2de2deda53f0a2913b0f314949ea/0',
	},
	{
		name: 'XIU YU HAI',
		latitude: 32.894922,
		longitude: -11.287307,
		destination: 'Casablanca, Morocco',
		source: 'Algeciras, Spain',
		vitesse: '12.4kn',
		arrival_date: '2022-09-23 20:42',
		proposed_speed: '15.4kn',
		expected_date: '2022-09-23 18:44',
		image: 'https://static.vesselfinder.net/ship-photo/9335202-215640000-c792b8412f63bf280aa2f0460d2c2d9d/0',
	},
	{
		name: 'SUNDRY',
		latitude: 32.144965,
		longitude: -14.321817,
		destination: 'Casablanca, Morocco',
		source: 'Newport News, United States (USA)',
		vitesse: '13.9kn',
		arrival_date: '2022-09-23 22:00',
		proposed_speed: '16.0kn',
		expected_date: '2022-09-23 20:33',
		image: 'https://static.vesselfinder.net/ship-photo/9141792-242198100-4fcd13898a750c76724b00adaf181e52/0',
	},
	{
		name: 'QUEEN ALESIA',
		latitude: 35.915893,
		longitude: -7.433132,
		destination: 'Casablanca, Morocco',
		source: 'Algeciras, Spain',
		vitesse: '14.1kn',
		arrival_date: '2022-09-23 09:45',
		proposed_speed: '8.9kn',
		expected_date: '2022-09-23 10:54',
		image: 'https://static.vesselfinder.net/ship-photo/9780665-477234800-bb67e8350710b6f112e55e8d10bb3a1f/0',
	},
	{
		name: 'PICO BASILE',
		latitude: 36.842569,
		longitude: -9.473578,
		destination: 'Casablanca, Morocco',
		source: 'Las Palmas, Spain',
		vitesse: '17.2kn',
		arrival_date: '2022-09-23 15:03',
		proposed_speed: '9.7kn',
		expected_date: '2022-09-23 22:54',
		image: 'https://static.vesselfinder.net/ship-photo/9356672-229825000-1b248758d6c04abad145c83af897e325/0',
	},
	{
		name: 'ESTHER',
		latitude: 38.512588,
		longitude: -10.188606,
		destination: 'Casablanca, Morocco',
		source: 'Las Palmas, Spain',
		vitesse: '15.1kn',
		arrival_date: '2022-09-23 15:03',
		proposed_speed: '10.4kn',
		expected_date: '2022-09-23 20:12',
		image: 'https://static.vesselfinder.net/ship-photo/9127007-636015001-136591d6a5c2adea2dd747aa263fa43a/0',
	},
	{
		name: 'HIGH SD YIHE',
		latitude: 33.612924,
		longitude: -7.602746,
		destination: 'Casablanca, Morocco',
		source: 'Lisboa, Portugal',
		vitesse: '16.2kn',
		arrival_date: '2022-09-23 17:12',
		proposed_speed: '10.1kn',
		expected_date: '2022-09-23 19:10',
		image: 'https://static.vesselfinder.net/ship-photo/9297606-255805839-944c91398f88140c5e31eabc6bbdcdda/0',
	},
	{
		name: 'ANHUI',
		latitude: 33.615188,
		longitude: -7.600917,
		destination: 'Casablanca, Morocco',
		source: 'Sillamae, Estonia',
		vitesse: '0kn',
		arrival_date: 'Arrivé',
		proposed_speed: '--',
		expected_date: 'Arrivé',
		image: 'https://static.vesselfinder.net/ship-photo/9379349-271001050-54250b92ba9f6e2dd914b7bc74de211f/0',
	},
];

export const VesselMapResult = () => {

	return (
		<div className='col-md-12'>
			<MapsComponent
				id="maps"
				centerPosition={{
					latitude: 34.543614,
					longitude: -5.151042
				}}
				zoomSettings={{
					enable: true,
					pinchZooming: true,
					zoomFactor: 6,
					toolbars: ['Zoom', 'ZoomIn', 'ZoomOut', 'Pan', 'Reset'],
				}}
				mapsArea={{
					background: '#AEE2FA'
				}}
			// titleSettings={{
			// 	text: 'Flights from India to China',
			// 	textStyle: {
			// 		size: '16px'
			// 	}
			// }}

			>
				<Inject services={[Marker, MapsTooltip, NavigationLine, Zoom]} />
				<LayersDirective>

					<LayerDirective layerType="OSM" animationDuration={0}>
						<MarkersDirective>
							<MarkerDirective
								visible={true}
								animationDuration={0}
								shape='Circle'
								fill='white'
								width={12}
								border={{
									color: '#285255',
									width: 2
								}}
								// template='<div><img src="https://ej2.syncfusion.com/react/demos/src/maps/images/ballon.png" style="height:30px;width:20px;"></img></div>'
								dataSource={data1}
								tooltipSettings={{
									visible: true,
									valuePath: 'name',
									template: '<div><img src=${image} style="height:130px;width:270px;"></img></div>' +
										'<div id="markertooltiptemplate" style="width: 270px;opacity: 90%;background: rgba(53, 63, 76, 0.94);box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.40);padding:10px;border: 1px #abb9c6;">' +
										'<div style="font-size:13px;color:#ffffff;font-weight: 500;"><center>${name}</center></div>' +
										'<hr style="margin-top: 2px;margin-bottom:5px;border:0.5px solid #DDDDDD">' +
										'<div><span style="font-size:13px;color:#cccccc">Destination : </span><span style="font-size:13px;color:#ffffff;font-weight: 500;">${destination}</span></div>' +
										'<div><span style="font-size:13px;color:#cccccc">Source : </span><span style="font-size:13px;color:#ffffff;font-weight: 500;">${source}</span></div>' +
										'<div><span style="font-size:13px;color:#cccccc">Vitesse : </span><span style="font-size:13px;color:#ffffff;font-weight: 500;">${vitesse}</span></div>' +
										'<div><span style="font-size:13px;color:#cccccc">Date d\'arrivée : </span><span style="font-size:13px;color:#ffffff;font-weight: 500;">${arrival_date}</span></div></div>' +
										'<div style="width: 270px;opacity: 90%;background: rgba(53, 63, 76, 0.94);box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.40);padding:10px;border: 1px #abb9c6;" class="bg-blue-500"><div><span style="font-size:13px;color:#fff">Vitesse proposée : </span><span style="font-size:15px;color:#ffffff;font-weight: 600;">${proposed_speed}</span></div>' +
										'<div><span style="font-size:13px;color:#fff">Date d\'arrivée prévu : </span><span style="font-size:15px;color:#ffffff;font-weight: 600;">${expected_date}</span></div></div>',

								}}
							></MarkerDirective>


						</MarkersDirective>
					</LayerDirective>



				</LayersDirective>
			</MapsComponent>
		</div>
	)
}

