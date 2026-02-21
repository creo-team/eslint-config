import React from 'react'

interface BeeProps {
	name: string
	role: 'drone' | 'queen' | 'worker'
}

interface HiveProps {
	beeCount: number
	bees: BeeProps[]
	hiveName: string
}

/**
 * Renders a hive with its name, bee count, and list of bees.
 *
 * @param props - Hive props.
 * @param props.beeCount - Number of bees.
 * @param props.bees - List of bees.
 * @param props.hiveName - Name of the hive.
 * @returns Hive UI.
 */
export const Hive: React.FC<HiveProps> = ({ beeCount, bees, hiveName }) => {
	if (beeCount === 0) {
		return <p>The hive "{hiveName}" has no bees currently.</p>
	}

	return (
		<div>
			<h1>Hive: {hiveName}</h1>
			<h2>Total Bees: {beeCount}</h2>
			<ul>
				{bees.map((bee: BeeProps) => (
					<li key={bee.name}>
						<strong>{bee.name}</strong> - {bee.role}
					</li>
				))}
			</ul>
		</div>
	)
}

/**
 * Example app that renders a hive with sample bees.
 *
 * @returns App UI.
 */
export const App: React.FC = () => {
	const exampleBees: BeeProps[] = [
		{ name: 'Buzz', role: 'worker' },
		{ name: 'Queenie', role: 'queen' },
		{ name: 'Dronezilla', role: 'drone' },
	]

	return (
		<div>
			<Hive beeCount={exampleBees.length} bees={exampleBees} hiveName="Golden Hive" />
		</div>
	)
}
