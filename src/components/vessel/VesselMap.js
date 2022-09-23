import React from 'react'
import { MapsComponent, Inject, LayersDirective, LayerDirective, Marker, MapsTooltip, MarkersDirective, MarkerDirective, NavigationLine, Zoom } from '@syncfusion/ej2-react-maps';
let data1 = [
	{
		name: 'rabat',
		latitude: 33.543614,
		longitude: -6.371042
	},
];

export const VesselMap = () => {

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
								fill='yellow'
								width={15}
								border={{
									color: '#285255',
									width: 2
								}}
								// template='<div><img src="https://ej2.syncfusion.com/react/demos/src/maps/images/ballon.png" style="height:30px;width:20px;"></img></div>'
								dataSource={data1}
								tooltipSettings={{
									visible: true,
									valuePath: 'name',
									template: '<div id="markertooltiptemplate" style="width: 170px;opacity: 90%;background: rgba(53, 63, 76, 0.90);box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.40);padding:10px;border: 1px #abb9c6;border-radius: 4px;">' +
										'<div style="font-size:13px;color:#ffffff;font-weight: 500;"><center>${name}</center></div>' +
										'<hr style="margin-top: 2px;margin-bottom:5px;border:0.5px solid #DDDDDD">' +
										'<div><span style="font-size:13px;color:#cccccc">Country : </span><span style="font-size:13px;color:#ffffff;font-weight: 500;">${Country}</span></div>' +
										'<div><span style="font-size:13px;color:#cccccc">Continent : </span><span style="font-size:13px;color:#ffffff;font-weight: 500;">${Continent}</span></div>' +
										'<div><span style="font-size:13px;color:#cccccc">Population : </span><span style="font-size:13px;color:#ffffff;font-weight: 500;">${population}</span></div></div>',

								}}
							></MarkerDirective>


						</MarkersDirective>
					</LayerDirective>



				</LayersDirective>
			</MapsComponent>
		</div>
	)
}

