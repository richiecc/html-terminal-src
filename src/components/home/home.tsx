import React, { useState } from 'react';
import './home.css';

// import { connect } from 'react-redux';


// import { Redirect } from 'react-router-dom';
// import { enterFunc  } from '../../actions/authActions';

// import { clearErrors } from '../../actions/errorActions';

// import {isMobile} from 'react-device-detect';
import Terminal from '../terminals/terminal';
import { TerminalCenter } from '../../components_styles/styles';


const Home = () => {
	const [terminals,setTerminals] = useState([{terminalId: Math.random().toString(36).substring(2, 30)}]);
	const [terminalcount,setTerminalCount] = useState(0)
	//const scrollit = () => inputRef.current?.scrollIntoView();
	const addTerminal = (e: any, id: string) => {
		e.preventDefault();
		setTerminals((prevState) => [...prevState, ...[{terminalId: id}]]);
	}

	return (
		<div className='terminal-center-client'>
				{/* <button onClick={(e) => addTerminal(e,Math.random().toString(36).substring(2, 30))} className='newTerminalBtn btn btn-secondary mt-1 m-auto'>new terminal</button> */}
			{terminals.map((data, i) => (
				<TerminalCenter key={i}>
					<Terminal terminalnode={i}  terminalId={data.terminalId} />
				</TerminalCenter>
			))}
		</div>
	);
}
export default Home;
