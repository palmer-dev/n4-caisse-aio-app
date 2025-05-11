import { FC, useCallback, useMemo } from 'react'
import Button from '@components/Button/Button.tsx'
import { ModalIds } from '@components/Modal/type.js'
import Modal from '@components/Modal/Modal.js'
import { SubmitHandler, useForm } from 'react-hook-form'
import {
  useLazyGetClientQuery,
  useSearchClientMutation
} from '@renderer/data/services/clients/clientsExtendedApi.ts'
import { MClient } from '@renderer/data/models/Client/MClient.ts'
import { useAppDispatch, useAppSelector } from '@stores/hook.js'
import { selectCart, setClient } from '@services/carts/cartSlice.js'
import { useAddSaleMutation } from '@services/sales/salesExtendedApi.js'
import { setSaleId } from '@services/sales/saleSlice.js'
import { open } from '@services/modal/modalSlice.js'

type Inputs = {
  code: string
  lastname: string
  firstname: string
  zip: string
}

const ClientModal: FC = () => {
  const [saveSale] = useAddSaleMutation()
  const dispatch = useAppDispatch()
  const cart = useAppSelector(selectCart)
  const [search, { data: searchedClients, isLoading: loadSearch, reset: resetSearch }] =
    useSearchClientMutation()
  const [getByCode, { data: gotClients, isLoading: loadByCode, reset: resetGotClient }] =
    useLazyGetClientQuery()

  const clients = useMemo(() => {
    const mergedMap = new Map<string, MClient>()

    if (gotClients) {
      const list = Array.isArray(gotClients) ? gotClients : [gotClients]
      list.forEach((client) => mergedMap.set(client.id, client))
    }

    if (searchedClients) {
      searchedClients.forEach((client) => mergedMap.set(client.id!, client))
    }

    return Array.from(mergedMap.values())
  }, [searchedClients, gotClients])

  const {
    register,
    handleSubmit,
    formState: { isLoading: formLoading, errors },
    watch
  } = useForm<Inputs>()

  const isLoading = useMemo(
    () => loadSearch || loadByCode || formLoading,
    [loadSearch, loadByCode, formLoading]
  )

  const searchClient: SubmitHandler<Inputs> = useCallback((data) => {
    if (data.code !== '') {
      getByCode(data.code)
      resetSearch()
    } else {
      search(data)
      resetGotClient()
    }
  }, [])

  const handleClientSelection = useCallback(
    (client: MClient) => {
      if (cart.client_id === client.id) dispatch(setClient(undefined))
      else dispatch(setClient(client.id ?? undefined))
    },
    [cart.client_id]
  )

  const handlePayment = async (): Promise<void> => {
    const { data: newSale } = await saveSale(cart)

    if (newSale && newSale.id) {
      dispatch(setSaleId(newSale.id))
      dispatch(open(ModalIds.SALE))
    }
  }

  const footer = useMemo(() => {
    return <Button onClick={handlePayment}>Lancer le payment</Button>
  }, [cart])

  return (
    <Modal className={'sm:max-w-2xl!'} id={ModalIds.SEARCH_CLIENT} footer={footer}>
      <h3 className="text-base font-semibold text-gray-900" id="modal-title">
        Identifier le client
      </h3>
      <form
        onSubmit={handleSubmit(searchClient)}
        className="flex flex-col justify-center gap-4 bg-white dark:bg-gray-700 dark:text-gray-200 p-6 rounded-md w-full"
      >
        <div>
          <input
            placeholder="Carte de fidélité"
            {...register('code')}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:outline-none"
          />
          {errors.code && (
            <span className="text-xs text-red-500 dark:text-red-400">{errors.code.message}</span>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Lastname input */}
          <div>
            <input
              placeholder="Nom"
              {...register('lastname', {
                required: watch('code') === '' ? 'Le prénom doit être saisi' : false
              })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:outline-none"
            />
            {errors.lastname && (
              <span className="text-xs text-red-500 dark:text-red-400">
                {errors.lastname.message}
              </span>
            )}
          </div>

          {/* Firstname input */}
          <div>
            <input
              placeholder="Prénom"
              {...register('firstname', {
                required: watch('code') === '' ? 'Le nom doit être saisi' : false
              })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:outline-none"
            />
            {errors.firstname && (
              <span className="text-xs text-red-500 dark:text-red-400">
                {errors.firstname.message}
              </span>
            )}
          </div>
        </div>

        {/* Zip input */}
        <div>
          <input
            placeholder="Code postal"
            {...register('zip')}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:outline-none"
          />
          {errors.zip && (
            <span className="text-xs text-red-500 dark:text-red-400">{errors.zip.message}</span>
          )}
        </div>

        {/* Submit button */}
        <Button
          isLoading={isLoading}
          isError={!!errors.firstname || !!errors.lastname || !!errors.zip}
        >
          Enregistrer
        </Button>
      </form>

      <div className={'overflow-x-auto'}>
        <table className={'w-max mt-2 text-sm min-w-full'}>
          <thead>
            <tr>
              <th className={'px-4 py-2 border-b'}>#</th>
              <th className={'px-4 py-2 border-b'}>Nom</th>
              <th className={'px-4 py-2 border-b'}>Prénom</th>
              <th className={'px-4 py-2 border-b'}>CP</th>
              <th className={'px-4 py-2 border-b'}>Mail</th>
              <th className={'px-4 py-2 border-b'}>Phone</th>
              <th className={'px-4 py-2 border-b'}>Newsletter</th>
              <th className={'px-4 py-2 border-b'}>Birthday</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr className={'bg-red-50/20 odd:bg-white even:bg-gray-200'}>
                <td colSpan={8} className={'px-4 py-2 text-center'} align={'center'}>
                  Loading...
                </td>
              </tr>
            )}
            {clients.map((client, i) => (
              <tr
                key={client.id + '-' + i}
                onClick={() => handleClientSelection(client)}
                className={
                  'bg-red-50/20 odd:bg-white even:bg-gray-200' +
                  (client.id === cart.client_id ? ' bg-blue-700! text-white!' : '')
                }
              >
                <td className={'px-4 py-2 border-b'}>{client.code}</td>
                <td className={'px-4 py-2 border-b'}>{client.lastname}</td>
                <td className={'px-4 py-2 border-b'}>{client.firstname}</td>
                <td className={'px-4 py-2 border-b'}>{client.zipcode}</td>
                <td className={'px-4 py-2 border-b'}>{client.email}</td>
                <td className={'px-4 py-2 border-b'}>{client.phone}</td>
                <td className={'px-4 py-2 border-b'}>{client.newsletter ? 'Oui' : 'Non'}</td>
                <td className={'px-4 py-2 border-b'}>{client.birthdate.toLocaleDateString()}</td>
              </tr>
            ))}
            {!isLoading && clients.length === 0 && (
              <tr className={'bg-red-50/20 odd:bg-white even:bg-gray-200'}>
                <td colSpan={8} className={'px-4 py-2 text-center'} align={'center'}>
                  Aucun client trouvé
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Modal>
  )
}

export default ClientModal
