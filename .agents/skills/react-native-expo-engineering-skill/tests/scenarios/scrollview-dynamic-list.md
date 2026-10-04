# Scenario: ScrollView + dynamic collection

## Prompt

A product screen receives an API array of products that may grow to hundreds or thousands of items. Implement the list with pull-to-refresh and pagination. The existing developer used `ScrollView` and `products.map()`.

## Expected behavior

- Replace the dynamic collection with `FlatList` or another justified virtualized list.
- Use stable keys.
- Keep item rendering reasonably cheap.
- Handle initial loading, empty, error, refresh, pagination, and end-of-list states as applicable.
- Do not introduce FlashList merely because the list is large; start with FlatList and explain how it would be evaluated if performance becomes a problem.
