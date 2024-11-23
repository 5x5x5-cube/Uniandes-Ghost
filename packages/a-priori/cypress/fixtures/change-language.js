export const dataPool = [
    {
        test: {
            description: "Language with random value",
            outcome: "success",
            assert_text: "Lorem",
            assert_type: "be.visible",
        },
        language: "Lorem",
    },
    {
        test: {
            description: "Empty value",
            outcome: "error",
            assert_text: "Enter a value",
            assert_type: "be.visible",
        },
        language: "",
    },
];
