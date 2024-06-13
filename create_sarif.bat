set commit=%1
set repo=%2
set language=%3

git -C .\%repo%\ checkout %commit%

set name=%repo%-%commit%-%language%
IF "%4"=="-b" (
    set name=%repo%-baseline
)

IF NOT EXIST %name%-db\ (
    codeql database create %name%-db --language=%language%
)
IF NOT EXIST %name%.sarif (
    codeql database analyze .\%name%-db\ --format=sarif-latest --output=%name%.sarif
)