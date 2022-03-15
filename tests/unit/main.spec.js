import { sum } from "../../src/main.js"

describe("Test de la fonction principale", () => {
    test("Example - toBe", () => {
        // Arrange
        let expected;
        // Act
        expected = sum(1,4)
        // Assert
        expect(expected).toBe(5);
    });
  });