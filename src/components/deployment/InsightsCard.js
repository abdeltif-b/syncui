import React from 'react';
import { Col, Divider, Row, Card, Statistic, Popover } from 'antd';
import { DownOutlined, ArrowUpOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import useSWR from 'swr';
import axios from 'axios';
import { numberFormat } from '../helpers';
import Text from 'antd/lib/typography/Text';

const arrayDataSource = {
	'Agence': ['AGA', 'FES', 'MAR', 'OUJ', 'RAB', 'TAN', 'TIM'],
	'Nb palettes': [10, 15, 10, 20, 5, 20, 5],
	'Nb SKUs': [1, 5, 11, 20, 5, 20, 5],
	'Saturation': [100, 500, 110, 200, 50, 200, 50],
	'Saturation projetée': [120, 200, 110, 180, 70, 180, 70],
}
const arrayDataSourceKeys = ['Agence', 'Nb palettes', 'Nb SKUs', 'Saturation']
const arrayDataSourceStatisticalKeys = ['Saturation']
const projectedColKey = 'Saturation projetée'
const popoverContent = (
	<div>
		<p><b>x%</b> (valeur avant déploiement)</p>
		<p><b><ArrowUpOutlined />y%</b> (valeur aprés déploiement)</p>
	</div>
)
const cardTitle = <b>Plan de transport et saturation</b>
const cardExtra = <Popover content={popoverContent}><QuestionCircleOutlined /></Popover>

const customParams = {
	params: {
		deployment_id: 31,
	}
}
const customConfig = {
	headers: {
		'Content-Type': 'application/json',
	},
}
const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL
const url = BASE_API_URL + '/web/deployment_line_insights'
const fetcher = async (url) => await axios.post(url, customParams, customConfig).then((res) => res.data);

const CardCol = ({ span, children }) => (
	<Col className="gutter-row" span={span} >
		<div>{children}</div>
	</Col>
)
const CardDivider = ({ value }) => (
	<Divider type='horizontal' orientation='left' plain>
		<Text type="secondary">{value}</Text>
	</Divider>
)
const CardStatistic = ({ oldVal, newVal, prefix }) => (
	<Statistic
		title={oldVal + prefix}
		value={newVal + prefix}
		precision={2}
		valueStyle={{
			color: oldVal >= newVal ? 'green' : 'red',
			fontSize: 'small',
		}}
		prefix={<><DownOutlined /><br></br></>}
		style={{
			textAlign: 'center',
		}}
	/>

)


const InsightsCard = () => {
	const { data, error } = useSWR(url, fetcher)
	if (error) return <div>Failed to load</div>
	if (!data) return <div>Chargement...</div>
	console.log('data' + JSON.stringify(data.result))

	return (
		<Card
			size='small'
			title={cardTitle}
			extra={cardExtra}
		>
			<Row gutter={[18, 8]} justify="space-around"  >
				<CardCol span={4}></CardCol>
				{
					data.result.map((item: any) => (
						<CardCol span={2}>
							<b>{item['Dépot']}</b>
						</CardCol>
					))
				}
			</Row>

			<CardDivider value='Plan de transport et saturation' />
			<Row gutter={[18, 8]} justify="space-around"  >
				<CardCol span={4}>Nb SKUs</CardCol>
				{
					data.result.map((item: any) => (
						<CardCol span={2}>
							<div>{numberFormat(item['Nb SKUs'])}</div>
						</CardCol>
					))
				}
			</Row>

			<Row gutter={[18, 8]} justify="space-around"  >
				<CardCol span={4}>Nb palettes</CardCol>
				{
					data.result.map((item: any) => (
						<CardCol span={2}>
							<div>{numberFormat(item['Nb palettes'])}</div>
						</CardCol>
					))
				}
			</Row>

			<Row gutter={[18, 8]} justify="space-around"  >
				<CardCol span={4}>Saturation</CardCol>
				{
					data.result.map((item: any) => (
						<CardCol span={2}>
							<CardStatistic oldVal={numberFormat(item['Saturation'])} newVal={numberFormat(item['Saturation après'])} prefix='%' />
						</CardCol>
					))
				}
			</Row>

			<CardDivider value='Commandes en cours kMAD' />
			<Row gutter={[18, 8]} justify="space-around"  >
				<CardCol span={4}>Total</CardCol>
				{
					data.result.map((item: any) => (
						<CardCol span={2}>
							<div>{numberFormat(item['Total'])}</div>
						</CardCol>
					))
				}
			</Row>

			<Row gutter={[18, 8]} justify="space-around"  >
				<CardCol span={4}>Livrable</CardCol>
				{
					data.result.map((item: any) => (
						<CardCol span={2}>
							<CardStatistic oldVal={numberFormat(item['Livrable'])} newVal={numberFormat(item['Livrable après'])} prefix='' />
						</CardCol>
					))
				}
			</Row>

			<CardDivider value='Chiffre d’affaires à risque kMAD' />
			<Row gutter={[18, 8]} justify="space-around"  >
				<CardCol span={4}>J+1 & J+2</CardCol>
				{
					data.result.map((item: any) => (
						<CardCol span={2}>
							<CardStatistic oldVal={numberFormat(item['J+1 & J+2'])} newVal={numberFormat(item['J+1 & J+2 après'])} prefix='' />
						</CardCol>
					))
				}
			</Row>

			<CardDivider value='Nombre de SKUs selon couverture' />
			<Row gutter={[18, 8]} justify="space-around"  >
				<CardCol span={4}>Ruptures</CardCol>
				{
					data.result.map((item: any) => (
						<CardCol span={2}>
							<CardStatistic oldVal={numberFormat(item['Ruptures'])} newVal={numberFormat(item['Ruptures après'])} prefix='' />
						</CardCol>
					))
				}
			</Row>

			<Row gutter={[18, 8]} justify="space-around"  >
				<CardCol span={4}>À risque</CardCol>
				{
					data.result.map((item: any) => (
						<CardCol span={2}>
							<CardStatistic oldVal={numberFormat(item['À risque'])} newVal={numberFormat(item['À risque après'])} prefix='' />
						</CardCol>
					))
				}
			</Row>

			<Row gutter={[18, 8]} justify="space-around"  >
				<CardCol span={4}>Surstock</CardCol>
				{
					data.result.map((item: any) => (
						<CardCol span={2}>
							<CardStatistic oldVal={numberFormat(item['Surstock'])} newVal={numberFormat(item['Surstock après'])} prefix='' />
						</CardCol>
					))
				}
			</Row>


		</Card >
	)
}
export default InsightsCard