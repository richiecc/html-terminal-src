import { createRef, Fragment, useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
// import Draggable from "react-draggable";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { clearErrors } from "../../requests&responses/errorActions";
import { terminalCommand } from "../../requests&responses/submitActions";
import { TerminalClient, TerminalContent, TerminalDisplayHolder, TerminalForm, TerminalTypingInput } from "../../components_styles/styles";
import { ITerminal, ITerminalReduxProps } from "../../interfaces/interfaces";

const Terminal = ({terminalnode, data, error, terminalCommand, clearErrors}: ITerminal) => {
    const cursorRef = createRef<HTMLDivElement>();
	const inputRef = createRef<HTMLInputElement>();
	const terminalRef = createRef<HTMLSpanElement>();
	const holderRef = createRef<HTMLDivElement>();
	const [input, setInput] = useState('');
    const [oldInput,setOldInput] = useState('');
    const [prevCommands,setPrevCommands] = useState([{}])
    const [isPassword,setIsPassword] = useState(false);
	const [redirectNow,setRedirect] = useState(false);
    const [userPath,setUserPath] = useState('');
    const [directoryPath, setDirectoryPath] = useState('');
    const [defaultPath] = useState(':~'); // default path changes to this :~/ when its in a different directory from default

	const [terminal, setTerminal] = useState([{id:'terminal',content:'Welcome to your HTML Terminal.'},{id:'terminal',content:'The back-end source is in its very early stages of development. So bare with me.'},{id:'terminal',content:'Please create your user or login.'},{id:'terminal',content:'Example: adduser username'}]);
    const [token,setToken] = useState('');
    const [spanText,setSpanText] = useState(userPath+defaultPath+directoryPath+'$ ');
    const enterCommand = (e: any) => {
        e.preventDefault();
        // (Client side commands)
        if(input === 'clear' || input === 'cls') {
            setTerminal([]);
            setSpanText(userPath+defaultPath+directoryPath+"$ ");
            setInput('');
            return;
        }
        // console.log(input.slice(input.length-2));
        if(!terminalRef.current) return;
        if((input.slice(input.length-2) === '-p' && input.includes('-u')) || (input.slice(input.length-9) === '-password' && input.includes('-username')) || (input.slice(input.length-2) === '-p' && input.includes('-username')) || (input.slice(input.length-9) === '-password' && input.includes('-u')) || (input.slice(0,2) === 'su') || (input.slice(0,7) === 'sudo su') || (input.slice(0,7) === 'adduser') || (input.slice(0,12) === 'sudo adduser')) {
            setIsPassword(true);
            setOldInput(input);
            setTerminal((prevState: any) => [...prevState, ...[{id:'terminalfont',content:userPath + defaultPath + directoryPath + '$ '+input}]]);
            setSpanText('Enter password: ');
            setInput('');
            return;
        }
        if(isPassword){
            if(!prevCommands.length) setPrevCommands([{input:oldInput}]);
            setPrevCommands((prevState: any) => [...[{input:oldInput}], ...prevState]);
            let totalinput = oldInput + input;
            if(!totalinput.includes('-p') && !totalinput.includes('-password')) totalinput = oldInput + ' ' + input; // checking if its "su" command.
            setSpanText(userPath+defaultPath+directoryPath+"$ ");
            setInput('');
            setIsPassword(false);
            terminalCommand(totalinput,token,terminalnode,directoryPath);
        } else {
            if(!prevCommands.length) setPrevCommands([{input:input}]);
            setPrevCommands((prevState: any) => [...[{input:input}], ...prevState]);
            setTerminal((prevState: any) => [...prevState, ...[{id:'terminalfont',content:userPath + defaultPath + directoryPath + '$ '+input}]]);
            setSpanText(userPath+defaultPath+directoryPath+"$ ");
            setInput('');
            terminalCommand(input,token,terminalnode,directoryPath);
        }
    }
    const inputFocus = () => {
        inputRef.current?.focus();
    }
    const inputCommandText = (e: any) => {
        setInput(e.target.value);
        if(!terminalRef.current) return;
        if(isPassword){
            let star = '';
            for(let i=0; i < e.target.value.length; i++){
                star = star + '*';
            }
            setSpanText('Enter password: ' + star);
        } else {
            // &nbsp
            if((e.nativeEvent.data === ' ') || (e.target.value && e.nativeEvent.data && e.nativeEvent.data.length && e.nativeEvent.data.charAt(e.nativeEvent.data.length-1) === ' ')) setSpanText(userPath + defaultPath + directoryPath + '$ ' + e.target.value + " ");
             else
                setSpanText(userPath + defaultPath + directoryPath + '$ ' + e.target.value);
        }
		if(isMobile){
			window.scrollTo({ left: 0, top: document.documentElement.scrollHeight });
			document.documentElement.scrollTop = document.documentElement.scrollHeight;
		}		
	}
    useEffect(() => {
        if(error.id === 'SET_ERROR' && error.terminalnode === terminalnode){
            setTerminal((prevState: any) => [...prevState, ...[{id:'errorMsg',content:error.msg.msg}]]);
            setSpanText(userPath + defaultPath + directoryPath + '$ ');
        }
        if(error.id === 'AUTH_ERROR' && error.terminalnode === terminalnode){
            setUserPath(''); setDirectoryPath('');
            setTerminal((prevState: any) => [...prevState, ...[{id:'errorMsg',content:error.msg.msg}]]);
            setSpanText(defaultPath +'$ ');
        }
    },[error]);// eslint-disable-line react-hooks/exhaustive-deps
    useEffect(() => {
        if(data && data.node === terminalnode) {
            setToken(data.token);
            setUserPath(data.username);
            let dPath = directoryPath;
            if(data.changePath) dPath = data.directoryPath;
            setDirectoryPath(dPath);
            setTerminal((prevState: any) => [...prevState, ...[{id:'id',content:data.msg}]]);
            setSpanText(data.username + defaultPath + dPath+'$ ');
        }
    },[data]);// eslint-disable-line react-hooks/exhaustive-deps

    useEffect(()=>{
        if(terminal){
            window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight);
            inputRef.current?.scrollIntoView();
        }
    },[terminal]);// eslint-disable-line react-hooks/exhaustive-deps
    const ctrlKeyDown = (e: any) => {
        if(e.key === 'c' && e.ctrlKey){
            setIsPassword(false);
            setTerminal((prevState: any) => [...prevState, ...[{id:'id',content:userPath + defaultPath + directoryPath + '$ '+'canceled process!'}]])
            if(!terminalRef.current) return;
            setInput('');
            setSpanText(userPath + defaultPath + directoryPath + '$ ');
        }
    }

    const TerminalClientFrag = (
        <Fragment>
            {redirectNow ? <Redirect to={directoryPath}push/>: null}
            <TerminalContent ref={holderRef}>
                {/* d-flex justify-content-start */}
                {terminal ? terminal.map((data: any, i: any)=>(
                    <div id={data.id} className="writeContent terminalfont" key={i} dangerouslySetInnerHTML={{__html: data.content}}></div>
                )): null}	
            </TerminalContent>
            <TerminalForm onSubmit={enterCommand}>
                <TerminalDisplayHolder className="d-flex justify-content-start">
                    <input 
                        ref={inputRef}
                        type="text"
                        autoComplete="off" 
                        id="terminal-input"
                        className="terminal-input"
                        value={input}
                        autoCapitalize='off'
                        aria-autocomplete="none"
                        autoCorrect="false"
                        onChange={inputCommandText}
                    />
                    <TerminalTypingInput ref={terminalRef}>
                        {spanText ? spanText.split("").map((data,i)=>(
                            <span key={i}>{data === " " ? <span dangerouslySetInnerHTML={{__html: '&nbsp'}}></span> : data}</span>
                        )): null}
                    </TerminalTypingInput>
                    <div ref={cursorRef} id="cursor"></div>
                </TerminalDisplayHolder>
            </TerminalForm>		
        </Fragment>
    )
    return(
        <TerminalClient onClick={inputFocus} onKeyDown={ctrlKeyDown}>
            {TerminalClientFrag}
        </TerminalClient>
    )
}

const mapStateToProps = (state: ITerminalReduxProps) => ({
	isAuthenticated: state.submit.isAuthenticated,
	data: state.submit.data,
	error: state.error
});

export default connect(mapStateToProps,{terminalCommand ,clearErrors})(Terminal);