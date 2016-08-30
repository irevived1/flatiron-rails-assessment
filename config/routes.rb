Rails.application.routes.draw do
  resources :notes
  resources :subjects
  get 'static/index'
  get 'static/about'

  root to: 'static#index'

  devise_for :users, :controllers => { :omniauth_callbacks => "users/omniauth_callbacks" }
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
