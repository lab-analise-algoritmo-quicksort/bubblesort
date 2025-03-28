import { faker } from "@faker-js/faker";
import { bubblesort } from "./bubblesort";
import { Text } from "./text";
export { bubblesort } from "./bubblesort";

const fakeNames = Array.from({ length: 100_000 }).map(() =>
  faker.person.firstName()
);

const content = Text.factory(...fakeNames);

const response = bubblesort(content);

console.log(response.results);
// console.log(response.content.map((item) => item.value));
