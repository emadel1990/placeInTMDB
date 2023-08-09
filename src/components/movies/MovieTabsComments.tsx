import { Tabs, TabsHeader, TabsBody, Tab, TabPanel } from '@material-tailwind/react';
import { MovieComments } from './MovieComments';
import { MovieTabsCommentsProps } from '../../interfaces/movie.interface';

export const MovieTabsComments = ({ movieComments }: MovieTabsCommentsProps) => {
	const data = [
		{
			label: 'Most Rated',
			value: 'rated'
		},
		{
			label: 'Recently Added',
			value: 'recent'
		},
		{
			label: 'Oldest',
			value: 'oldest'
		}
	];

	return (
		<div>
			<Tabs
				value="rated"
				className="w-[700px]">
				<TabsHeader
					className="bg-[rgba(239,108,0,1)] "
					indicatorProps={{
						className: 'bg-white'
					}}>
					{data.map(({ label, value }) => (
						<Tab
							className="text-gray-800 font-bold"
							key={value}
							value={value}>
							{label}
						</Tab>
					))}
				</TabsHeader>
				<TabsBody>
					{data.map(({ value }) => (
						<TabPanel
							className="w-96 text-gray-100 mt-5"
							key={value}
							value={value}>
							<MovieComments
								comments={movieComments}
								type={value}
							/>
						</TabPanel>
					))}
				</TabsBody>
			</Tabs>
		</div>
	);
};
