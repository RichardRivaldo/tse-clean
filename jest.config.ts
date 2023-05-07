export default {
    clearMocks: true,
    coverageProvider: "v8",
    moduleFileExtensions: ["ts", "js", "json", "node"],
    roots: ["./src"],
    testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[tj]s?(x)"],
    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest",
    },
}