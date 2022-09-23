import { State } from "../components/widgets/State";
import { Skeleton } from "primereact/skeleton";

export const clampNumber = (num, a, b) => Math.max(Math.min(num, Math.max(a, b)), Math.min(a, b));

export const numberBodyTemplate = (rowData, options) => {
	// return new Intl.NumberFormat("en-US", {
	// 	style: "decimal",
	// 	currency: "USD"
	// }).format(rowData.price);
	if (rowData[options.field] === 0) return 0
	if (!rowData[options.field]) return '-'
	return rowData[options.field].toFixed(2)
};
export const skeletonBodyTemplate = () => {
	return <Skeleton></Skeleton>
};


export const deploymentState = {
	created: {
		value: 'created',
		label: 'Simulé',
		color: 'black'
	},
	fixed: {
		value: 'fixed',
		label: 'Planifié',
		color: 'blue'
	},
	in_progress: {
		value: 'in_progress',
		label: 'En cours',
		color: 'yellow'
	},
	done: {
		value: 'done',
		label: 'Achevé',
		color: 'green'
	},
	stopped: {
		value: 'stopped',
		label: 'Arrêté',
		color: 'red'
	}
}

export const deploymentStateBodyTemplate = (state) => {
	return State(deploymentState[state].label, deploymentState[state].color, { className: 'mx-3' })
};

export const deploymentCoverageStateBodyTemplate = (rowData, options) => {
	if (rowData[options.field] === 'rupture') return <div className="text-red-600">Rupture</div>
	if (rowData[options.field] === 'good_stock') return <div className="text-green-600">Bon stock</div>
	if (rowData[options.field] === 'rupture_risk') return <div className="text-yellow-600">Risque rupture</div>
	if (rowData[options.field] === 'overstock') return <div className="text-blue-600">Sur-stock</div>
	return rowData[options.field]
};

export const toDecimal = (value, empty) => {
	if (!value) return empty ?? '-'
	return value.toFixed(2)
};
