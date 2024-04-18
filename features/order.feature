Feature: Add items to cart and complete order

  Scenario Outline: Verify items in cart are retained in cart after logout
    Given I am on the login page
    When I login with <username> and <password>
    Then I add an item to the cart
    And I add an item to the cart
    And I add an item to the cart
    Then I get the items in the cart
    Then I logout
    And I login with <username> and <password>
    Then I verify the items in the cart
    Then I logout

    Examples:
      | username       | password     |
      | standard_user  | secret_sauce |


  
  Scenario Outline: Verify user can place order
    Given I am on the login page
    When I login with <username> and <password>
    Then I change the sort order to hilo
    And I add an item to the cart
    Then I change the sort order to lohi
    And I add an item to the cart
    Then I navigate to checkout information page
    And I verify the input fields
    Then I navigate to overview page and verify price and place order
    Then I navigate to home page

    Examples:
      | username          | password     |
      | standard_user     | secret_sauce |
