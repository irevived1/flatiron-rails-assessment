Rails.application.routes.draw do
  devise_for :users, :controllers => { :omniauth_callbacks => "users/omniauth_callbacks" }

  get 'subjects/:id/notes/new' => 'notes#notewithsub', as: 'notesub'
  resources :subjects do
    resources :notes
  end
  # resource :notes
  get 'notes/new' => 'notes#new', as: 'notes'
  post 'notes/new' => 'notes#create'
  # put 'notes/:id' => 'notes#update'

  get 'static/index'
  get 'home/index'

  root to: 'static#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
