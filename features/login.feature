Feature: Login Validations

  Scenario Outline: Verify successfull login and landing on home page

    Given I am on the login page
    When I login with <username> and <password>
    Then I logout

    Examples:
      | username                  | password     |
      | standard_user             | secret_sauce |
      | performance_glitch_user   | secret_sauce |

  
  Scenario Outline: Verify login fails and assert error on login screen

    Given I am on the login page
    When I login with <username> and <password>
    Then I should see a locked out user error

    Examples:
      | username          | password     |
      | locked_out_user   | secret_sauce |
