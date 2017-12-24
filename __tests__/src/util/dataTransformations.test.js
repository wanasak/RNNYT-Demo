import { reshapeNewsData } from "../../../src/util/dataTransformations";
import fs from "fs";

const testData = JSON.parse(fs.readFileSync(__dirname + "/testData.json"));

describe("dataTransformations util", () => {
    describe("reshapeNewsData function", () => {
        it("should correctly transform NYT news objects", () => {
            const transformData = reshapeNewsData(testData);

            expect(transformData).toEqual([
                {
                    description:
                        "React Native, the framework for building mobile applications with web technologies, is expanding to new platforms",
                    author: "JACOB FRIEDMANN",
                    location: "",
                    imageUrl: "https://example.com/image.jpg",
                    date: "Sep 10th 2016",
                    title: "React Native Expands to New Platforms",
                    url: "http://example.com/react-native-expands"
                }
            ]);
        });
    });
});
