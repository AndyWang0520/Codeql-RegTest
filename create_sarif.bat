set commit=%1
set repo=%2
set language=%3

git -C .\%repo%\ checkout %commit%

codeql database create %repo%-db-%commit% --language=%language%
codeql database analyze .\%repo%-db-%commit%\ --format=sarif-latest --output=%repo%-%commit%.sarif