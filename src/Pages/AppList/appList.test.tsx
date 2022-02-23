import { cleanup, fireEvent, render } from '@testing-library/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppList from './appList';
import { rest } from 'msw'


import { setupServer } from 'msw/node'

// This configures a request mocking server with the given request handlers.
const data=[
    {
      "appId": "1978383a738bd9fa",
      "usersCount": "31"
    },
    {
      "appId": "20273701ad1ab98",
      "usersCount": "45"
    }
]


export const server = setupServer(
    rest.post('http://localhost:8080/api/v1/admin/apps', (req,res,ctx)=>{
    return res(ctx.json(data));
  })
)


// Establish API mocking before all tests.
beforeAll(() => server.listen())

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
beforeEach(() => server.resetHandlers())

// Clean up after the tests are finished.
afterAll(() => server.close())


describe("changeInInput", () => {
//     it("onChange userName", () => {
//         expect(fetch("")).toBe("testValue")
// })

it("api test",async()=>{
    const { findByText } = render(
        <BrowserRouter>
        <Routes> 
             <Route path="*" element= {<AppList />}/>
        </Routes > 
    </BrowserRouter>
    )
    // console.log({findByText})
    // expect(findByText("1978383a738bd9fa")).toBeInTheDocument();
})
});

