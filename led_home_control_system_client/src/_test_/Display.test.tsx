import React from "react";
import { act, screen, render } from "@testing-library/react";


import DisplayIndex from '../compoments/DisplayIndex'

describe('<DisplayIndex />', () =>{
it("renders <DisplayIndex", ()=>{
const {getByText} = render(<DisplayIndex />);
expect(getByText(/Available LED Displays/i)).toBeInTheDocument();
})
})