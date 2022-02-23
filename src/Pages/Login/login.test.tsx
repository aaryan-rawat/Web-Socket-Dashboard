import { fireEvent, render } from "@testing-library/react";
import { Route, Router, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Login from "./login"
describe("changeInInput", () => {
    it("onChange userName", () => {
        const { queryByTitle } = render(
        <BrowserRouter>
            <Routes> 
                 <Route path="*" element= {<Login />}/>
            </Routes > 
        </BrowserRouter>
       );
    const input: any = queryByTitle("name")
    fireEvent.change(input, { target: { value: "testValue" } });
    expect(input.value).toBe("testValue")
})

it("onChange password", () => {
    const { queryByTitle } = render(
    <BrowserRouter>
        <Routes> 
             <Route path="*" element= {<Login />}/>
        </Routes > 
    </BrowserRouter>
   );
const input: any = queryByTitle("password")
fireEvent.change(input, { target: { value: "testValue" } });
expect(input.value).toBe("testValue")
})

it("onChange region", () => {
    const { queryByTitle } = render(
    <BrowserRouter>
        <Routes> 
             <Route path="*" element= {<Login />}/>
        </Routes > 
    </BrowserRouter>
   );
const input: any = queryByTitle("region")
fireEvent.change(input, { target: { value: "testValue" } });
expect(input.value).toBe("testValue")
})
})