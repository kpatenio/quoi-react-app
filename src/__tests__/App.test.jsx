import React from "react";
import { render, fireEvent, waitForElement, waitForElementToBeRemoved, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "../App";

// Use MemoryRouter to maintain react router's context.
// See here: https://reacttraining.com/react-router/web/guides/testing

describe("App", () => {
    describe("initial render", () => {
        afterEach(() => {
            cleanup();
        })
        it("should render App and match snapshots", () => {
            const { container } = render(
                <MemoryRouter>
                    <App />
                </MemoryRouter>
            );
            expect(container.firstChild).toMatchSnapshot();
        });
    
        it("should render header", () => {
            const { getByTestId } = render(
                <MemoryRouter>
                    <App />
                </MemoryRouter>
            );
            getByTestId("header");
        });
    
        it("should render main content", () => {
            const { getByTestId } = render(
                <MemoryRouter>
                    <App />
                </MemoryRouter>
            );
            getByTestId("main");
        });
    
        it("should render footer", () => {
            const { getByTestId } = render(
                <MemoryRouter>
                    <App />
                </MemoryRouter>
            );
            getByTestId("footer");
        });
    
    });
    
    describe("navigating and routing", () => {
        afterEach(() => {
            cleanup();
        })
        it("should render About page if the About nav is selected", () => {
            const { getByTestId } = render(
                <MemoryRouter>
                    <App />
                </MemoryRouter>
            );
            const aboutButton = getByTestId("header-about");
            fireEvent.click(aboutButton);
            getByTestId("about");
        });

        it("should still display header and footer after changing routes", () => {
            const { getByTestId } = render(
                <MemoryRouter>
                    <App />
                </MemoryRouter>
            );
            const aboutButton = getByTestId("header-about");
            fireEvent.click(aboutButton);
            getByTestId("header");
            getByTestId("footer");
        });

        it("should display the header searchbar and unmount the homepage searchbar when navigating out of homepage", () => {
            const { queryByTestId } = render(
                <MemoryRouter>
                    <App />
                </MemoryRouter>
            );
            expect(queryByTestId("searchbar-homepage")).not.toBeNull()
            expect(queryByTestId("searchbar-header")).toBeNull();

            const aboutButton = queryByTestId("header-about");
            fireEvent.click(aboutButton);
            expect(queryByTestId("searchbar-homepage")).toBeNull()
            expect(queryByTestId("searchbar-header")).not.toBeNull();
        })

        it("should navigate to homepage after clicking on the header-logo", () => {
            const { getByTestId } = render(
                <MemoryRouter>
                    <App />
                </MemoryRouter>
            );
            const logo = getByTestId("header-logo");
            fireEvent.click(logo);
            getByTestId("homepage");
        });

        it("should navigate to an entry page after entering input via searchbar", () => {
            const { queryByTestId, getByTestId, getByLabelText } = render(
                <MemoryRouter>
                    <App />
                </MemoryRouter>
            );
            const searchbar = getByTestId("searchbar-homepage");
            const searchButton = getByLabelText("icon: search"); // label provided by antd

            fireEvent.input(searchbar, {target: {value: "test"}});
            expect(searchbar.value).toBe("test");

            fireEvent.click(searchButton);
            // fireEvent.keyDown(searchbar, {key: "Enter", keyCode: 13});
            getByTestId("entry");
            expect(queryByTestId("homepage")).toBeNull();
        })

        it.skip("should render content with successful search", () => {
            // TODO - mock resolve - maybe we should separate getContent
        });
    })
});
