### Define pivot currency

```gherkin
As a Foreign Exchange Expert
I want to be able to define a Pivot Currency
So that I can express exchange rates based on it
```

#### All exchange rates are defined from the pivot currency

```gherkin
Given a Bank with EUR as pivot currency
When I define an exchange rate of 1.2 to USD
Then I can convert 10 EUR to 12 USD
```

```gherkin
Given a Bank with EUR as pivot currency
When I define an exchange rate of 1.2 to USD
Then I can convert 12 USD to 10 EUR
```

### Round tripping

```gherkin
Given a currency using cents
When I convert
Then the converted amount is rounded to 1/100 
```

```gherkin
Given 4 KRW
When I convert them to USD
Then it returns 0 USD
```

```gherkin
Given 1000 KRW
When I convert them to EUR
Then it returns 0.07 EUR
```

M -1% =< M =< M +1% = TRUE

#### Convert a money

```gherkin
Given 10 KRW and 10KRW
When I convert them to KRW
Then it returns 10KRW
```

```gherkin
Given a bank with EUR as the pivot currency 
And an exchange rate for USD of 1.2
When I convert 120USD to EUR
Then it returns 100 EUR
```

```gherkin
Given a bank with EUR as the pivot currency 
When I convert 120USD to EUR
Then it throws an exception
```

```gherkin
Given a bank with EUR as the pivot currency 
When I convert 120USD to USD
Then it returns 120USD
```

```gherkin
Given a bank with EUR as the pivot currency 
When I convert 120USD to KRW
Then it throws an exception
```

```gherkin
Given a bank with EUR as the pivot currency 
And an exchange rate for USD of 1.2 
And an exchange rate for KRW of 1344
When I convert 120USD to KRW
Then it returns 134400 KRW
```
