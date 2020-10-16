import React from "react";
import { act, screen , render} from "@testing-library/react";


// COMPENTENTS
import App from "../App";
// import DisplayIndex from "../compoments/DisplayIndex";



describe("<App />", () => {
  it("renders without crashing", () => {
    render(<App />);
    // screen.debug();
  });
  it("Renders <App /> component correctly", () => {
    const { getByText } = render(<App />);
    expect(getByText(/meow/i)).toBeInTheDocument();
  });
});

// describe("Display", () => {
//   it("renders the Index Compoment", () => {
//     render(<DisplayIndex />);
//     expect(screen.getByText("Search:")).toBeInTheDocument();
//     // screen.debug();
//   });
// });
