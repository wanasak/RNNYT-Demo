import "react-native";
import React from "react";
import NewsItem from "../../../src/components/NewsItem";
import renderer from 'react-test-renderer';

// a function that does nothing
const noop = () => {};

const testData = {
    description:
        "React Native, the framework for building mobile applications with web technologies, is expanding to new platforms.",
    author: "JACOB FRIEDMANN",
    location: "",
    imageUrl: "https://example.com/image.jpg",
    date: "Sep 10th 2016",
    title: "React Native Expands to New Platforms",
    url: "http://example.com/react-native-expands",
    onPress: noop,
    onBookmark: noop
};

describe("NewsItem component", () => {
    it("should render correctly", () => {
        const renderedComponent = renderer.create(
            <NewsItem
                index={0}
                {...testData}
            />
        ).toJSON();

        expect(renderedComponent).toMatchSnapshot();
    });
});