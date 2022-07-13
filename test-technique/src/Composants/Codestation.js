import React from "react";

class Codestation extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			items: [],
			EstChargee: false,
      		parametreCodeStation:this.props.codeStation
		};
	}
 
	componentDidMount() {
		fetch(`https://hubeau.eaufrance.fr/api/v1/temperature/chronique?code_station=${this.state.parametreCodeStation}&size=1&sort=desc&pretty`)
			.then((res) => res.json())
			.then((json) => {
				this.setState({
					items: json.data,
					EstChargee: true
				});
			})
	}

	render() {
		const { EstChargee, items } = this.state;

		if (!EstChargee) return <div>
			<h1> Erreur de chargement des données depuis l'API.</h1> </div> ;

		return (
		<div className = "App">
			{
				items.map((item) => (
					<ol key = { item.id } >
						> Dernière mesure effectuée le {item.date_mesure_temp}: {item.resultat} {item.symbole_unite}
					</ol>
				))
			}
		</div>
	);
}
}

export default Codestation;
