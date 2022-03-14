const sum =  require("../../src/main.js");

describe("Test de la fonction principale", () => {
    test("Example - toBe", () => {
        // Arrange
        var expected;
        // Act
        expected = sum(1,4)
        // Assert
        expect(expected).toBe(5);
    });
  });