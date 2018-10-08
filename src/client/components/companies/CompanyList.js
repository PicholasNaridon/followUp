import React, { Component } from 'react';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import { Grid, Row, Col } from 'react-bootstrap';
import { DollarFormat } from '../components';
import ReactTable from 'react-table';
import axios from 'axios';

const columns = [
	{
		Header: 'Name',
		accessor: 'name',
		Cell: (props) => (
			<span className="">
				<a href={'#/companies/' + props.original.id}>{props.original.name}</a>
			</span>
		)
	},
	{
		Header: 'Deal Count',
		accessor: 'Deals',
		Cell: function(props) {
			var total = 0;
			props.original.Deals.forEach(function(deal) {
				total += 1;
			});
			return <span>{total}</span>;
		}
	},
	{
		Header: 'Sales in Funnel',
		accessor: 'Deals',
		Cell: function(props) {
			var total = 0;
			props.original.Deals.forEach(function(deal) {
				if (deal.stage != 'Closed Won' && deal.stage !== 'Closed Lost') {
					total += deal.amount;
				}
			});
			return <DollarFormat value={total} />;
		}
	},
	{
		Header: 'Won Sales',
		accessor: 'Deals',
		Cell: function(props) {
			var total = 0;
			var total = 0;
			props.original.Deals.forEach(function(deal) {
				if (deal.stage === 'Closed Won') {
					total += deal.amount;
				}
			});
			return <DollarFormat value={total} />;
		}
	},
	{
		Header: 'Contact Count',
		accessor: 'Contacts',
		Cell: function(props) {
			var total = 0;
			props.original.Contacts.forEach(function(deal) {
				total += 1;
			});
			return <span>{total}</span>;
		}
	},
	{
		Header: 'Address',
		columns: [
			{
				Header: 'Address 1',
				accessor: 'address1'
			},
			{
				Header: 'Address 2',
				accessor: 'address2'
			},
			{
				Header: 'City',
				accessor: 'city'
			},
			{
				Header: 'State',
				accessor: 'state'
			},
			{
				Header: 'Zip',
				accessor: 'zip'
			},
			{
				Header: 'Country',
				accessor: 'country'
			}
		]
	}
];

class CompanyList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			companies: []
		};
	}
	componentDidMount() {
		axios(`/api/companies`, {
			params: {
				userId: this.props.userId
			}
		}).then((response) => {
			console.log(response);
			this.setState({ companies: response.data });
		});
	}
	render() {
		return (
			<Grid>
				<Row>
					<Col md={6}>
						<h1>Companies</h1>
					</Col>
				</Row>
				<Row>
					<Col md={12}>
						<ReactTable
							pageSize={10}
							data={this.state.companies}
							columns={columns}
							filterable
							defaultFilterMethod={(filter, row) => String(row[filter.id]) === filter.value}
						/>
					</Col>
				</Row>
			</Grid>
		);
	}
}

export default CompanyList;
