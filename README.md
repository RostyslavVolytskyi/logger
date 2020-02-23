# Logger
Build a metric logging and reporting service that sums metrics by time window for the most recent hour. You will build a lightweight web server that implements the two main APIs defined below.

Clarifications
• For the sake of the problem, persistence is not required. Therefore don’t use a database but just use in-memory data structures or file storage only.
• You can use either Node standard library or small web framework like Express. • You should optimize for both readability of your code and performance.
• All values will be rounded to the nearest integer
• Get rid of any reported data after it is more than an hour old since we only need
up to the most recent hour.
