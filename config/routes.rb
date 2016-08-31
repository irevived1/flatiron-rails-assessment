Rails.application.routes.draw do
  devise_for :users, :controllers => { :omniauth_callbacks => "users/omniauth_callbacks" }
  resources :subjects do
    resources :notes
  end
  get 'notes/new' => 'notes#new', as: 'notes'

  get 'static/index'
  get 'home/index'

  root to: 'static#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
