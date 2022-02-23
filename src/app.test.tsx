import { getByTitle, queryByAttribute, render ,screen} from "@testing-library/react";
import { createElement } from "react";
import { unmountComponentAtNode } from "react-dom";
import App from './App'



it("sample test",()=>{
const {getByText} = render(<App/>);
const linkElement= screen.getAllByTitle('random_testing_div')
expect(linkElement[0]).toBeInTheDocument();
})
