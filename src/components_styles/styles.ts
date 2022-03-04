import styled, { css } from "styled-components";

export const TerminalCenter = styled.div`
    width:100vw;
    height:100vh;
`

export const TerminalClient = styled.div`
    width:100%;
    height:100%;
	overflow: auto;
	position:absolute;
	z-index: 99;
`
export const TerminalContent = styled.div`
	background-color:var(--default-background);
	word-break: break-all;
	overflow-y:auto;
    scrollbar-width: none; 
    -ms-overflow-style: none;
	scrollbar-color: transparent transparent;
	&::-moz-scrollbar{
		display:none;
	}
`

export const TerminalForm = styled.form`
	background-color: black;
	color:white;
	max-width:100%;
`

export const TerminalDisplayHolder = styled.div`
	display:inline-block;
	padding-left:10px;
	padding-bottom:10px;
	overflow:hidden;
`

export const TerminalTypingInput = styled.span`
	word-break:break-all;
	text-align: left;
	margin-left:2px;
	overflow:auto;
	max-width:100%;
`