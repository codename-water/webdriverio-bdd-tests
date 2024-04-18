Feature: Items sort order Validations

#sortOrder values -> az (default), za, lohi, hilo

  Scenario Outline: Verify default sort order

    Given I am on the login page
    When I login with <username> and <password>
    Then I verify the <sortOrder> of the items

    Examples:
      | username          | password     | sortOrder |
      | standard_user     | secret_sauce | az        |

  
  Scenario Outline: Verify user to able to change sort order

    Given I am on the login page
    When I login with <username> and <password>
    Then I change the sort order to <sortOrder>
    Then I verify the <sortOrder> of the items

    Examples:
      | username          | password     | sortOrder |
      | standard_user     | secret_sauce | hilo      |
