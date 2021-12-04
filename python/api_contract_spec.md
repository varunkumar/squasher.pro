**GET /squash-it** \
Returns a summary of the provided input 

URL params: none \
Headers: Content-Type: application/json \
Data Params: 
```
{
    content: string,
    summary_lines: int
}
```
Success Response: \
Code: 200 \
Content:
```
{
    summary: string,
    engine: string,
    metrics: {
        latency: string
        # need to check for other relavant metrics
    }
}
```
Error Response: \
Code: 500 \
Content: { error : "Internal Server Error " }

<br>
<br>

**POST /slack-summarize** \
Retrieves the conversation on the slack thread and writes a summary to the thread that can only be read by the user invoking the api

URL params: none \
Headers: Content-Type: application/json \
Data Params: 
```
{
    payload: SlackPayload
}
```
Success Response: \
Code: 200 \
Content: {} \
Error Response: \
Code: 500 \
Content: { error : "Internal Server Error " }

<br>
<br>

**POST /feedback**
Accepts feedback information from the user to further train and improve the model \
URL params: none \
Headers: Content-Type: application/json \
Data Params:
```
{
    content: string,
    original_summary: string,
    suggested_summary: string,
    engine: string,
}
```
Success Response: \
Code: 200 \
Content: {} \
Error Response: \
Code: 500 \
Content: { error : "Internal Server Error " }
